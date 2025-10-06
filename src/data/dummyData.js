export const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    description:
      "A spacious suite with a king-sized bed, a separate living area, and a private balcony with city views.",
    price: 250,
    amenities: [
      "King Bed",
      "Free WiFi",
      "Air Conditioning",
      "Mini Bar",
      "City View",
    ],
    image: "assets/images/room-penthouse.jpg",
  },
  {
    id: 2,
    name: "Ocean View Room",
    description:
      "Wake up to stunning ocean views. This room features a comfortable queen bed and modern amenities.",
    price: 180,
    amenities: ["Queen Bed", "Free WiFi", "Air Conditioning", "Ocean View"],
    image: "assets/images/room-penthouse.jpg",
  },
  {
    id: 3,
    name: "Standard Room",
    description:
      "A cozy and affordable room perfect for solo travelers or couples, equipped with all essential comforts.",
    price: 120,
    amenities: ["Double Bed", "Free WiFi", "Air Conditioning"],
    image: "assets/images/room-penthouse.jpg",
  },
  {
    id: 4,
    name: "The Penthouse",
    description:
      "The ultimate luxury experience. Our penthouse offers panoramic city and ocean views, a private jacuzzi, and exclusive services.",
    price: 550,
    amenities: [
      "King Bed",
      "Jacuzzi",
      "Kitchenette",
      "Panoramic View",
      "Butler Service",
    ],
    image: "assets/images/room-penthouse.jpg",
  },
];

export const userBookings = [
  {
    id: 1,
    confirmation_number: "RES123456789",
    room_id: 2,
    room_name: "Ocean View Room",
    check_in: "2025-11-15",
    check_out: "2025-11-20",
    total_price: 981,
    guests: 2,
    status: "confirmed",
  },
  {
    id: 2,
    confirmation_number: "RES987654321",
    room_id: 4,
    room_name: "The Penthouse",
    check_in: "2025-08-01",
    check_out: "2025-08-05",
    total_price: 2398,
    guests: 2,
    status: "completed",
  },
  {
    id: 3,
    confirmation_number: "RES555444333",
    room_id: 1,
    room_name: "Deluxe Suite",
    check_in: "2026-01-10",
    check_out: "2026-01-12",
    total_price: 545,
    guests: 1,
    status: "confirmed",
  },
];
