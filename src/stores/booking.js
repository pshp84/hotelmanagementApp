import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { rooms, userBookings as dummyUserBookings } from "@/data/dummyData";

export const useBookingStore = defineStore("booking", () => {
  const searchParams = ref({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const selectedRoom = ref(null);
  const contactDetails = ref({
    fullName: "",
    email: "",
    mobile: "",
  });
  const confirmationDetails = ref(null);
  const roomsData = ref([...rooms]);
  const userBookings = ref([...dummyUserBookings]);
  const isLoading = ref(false);
  const error = ref(null);

  const bookingStage = computed(() => {
    if (!searchParams.value.checkIn) return "search";
    if (!selectedRoom.value) return "select-room";
    if (!contactDetails.value.fullName) return "contact";
    return "confirmed";
  });

  const numberOfNights = computed(() => {
    if (searchParams.value.checkIn && searchParams.value.checkOut) {
      const start = new Date(searchParams.value.checkIn);
      const end = new Date(searchParams.value.checkOut);
      const diff = Math.abs(end - start);
      const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    }
    return 0;
  });

  const priceDetails = computed(() => {
    if (!selectedRoom.value || numberOfNights.value === 0) {
      return { subtotal: 0, tax: 0, total: 0 };
    }
    const subtotal = selectedRoom.value.price * numberOfNights.value;
    const tax = subtotal * 0.09;
    const total = subtotal + tax;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  });

  const fetchRooms = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      roomsData.value = [...rooms];
      return roomsData.value;
    } catch (err) {
      error.value = "Failed to fetch rooms";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchRoomById = async (roomId) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const room = rooms.find((r) => r.id === parseInt(roomId));
      if (!room) {
        throw new Error("Room not found");
      }
      return room;
    } catch (err) {
      error.value = "Failed to fetch room";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const bookRoom = async () => {
    if (!selectedRoom.value || !contactDetails.value.fullName) {
      throw new Error("Missing booking information");
    }

    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const confirmationNumber =
        "RES" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const mockBooking = {
        id: userBookings.value.length + 1,
        confirmation_number: confirmationNumber,
        room_id: selectedRoom.value.id,
        room_name: selectedRoom.value.name,
        check_in: searchParams.value.checkIn,
        check_out: searchParams.value.checkOut,
        total_price: parseFloat(priceDetails.value.total),
        guests: searchParams.value.guests,
        status: "confirmed",
      };

      userBookings.value.push(mockBooking);

      confirmationDetails.value = {
        ...mockBooking,
        guestDetails: { ...contactDetails.value },
        roomDetails: { ...selectedRoom.value },
        stayDetails: { ...searchParams.value },
        nights: numberOfNights.value,
        pricing: { ...priceDetails.value },
      };

      return mockBooking;
    } catch (err) {
      error.value = "Failed to book room";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUserBookings = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return userBookings.value;
    } catch (err) {
      error.value = "Failed to fetch bookings";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const cancelBooking = async (bookingId) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = userBookings.value.findIndex(
        (booking) => booking.id === bookingId
      );
      if (index !== -1) {
        userBookings.value[index].status = "cancelled";
        return userBookings.value[index];
      }
      throw new Error("Booking not found");
    } catch (err) {
      error.value = "Failed to cancel booking";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  function setSearchParams(params) {
    searchParams.value = params;
  }

  function selectRoom(room) {
    selectedRoom.value = room;
  }

  function setContactDetails(details) {
    contactDetails.value = details;
  }

  function createConfirmation() {}

  function resetBooking() {
    searchParams.value = { checkIn: "", checkOut: "", guests: 1 };
    selectedRoom.value = null;
    contactDetails.value = { fullName: "", email: "", mobile: "" };
    confirmationDetails.value = null;
  }

  return {
    searchParams,
    selectedRoom,
    contactDetails,
    confirmationDetails,
    rooms: roomsData,
    userBookings,
    isLoading,
    error,

    bookingStage,
    numberOfNights,
    priceDetails,

    fetchRooms,
    fetchRoomById,
    bookRoom,
    fetchUserBookings,
    cancelBooking,

    setSearchParams,
    selectRoom,
    setContactDetails,
    createConfirmation,
    resetBooking,
  };
});
