// import React from 'react';
// import { ListFlights } from './custom-ui/Listflights';
// import { PurchaseTickets } from './custom-ui/Purchasetickets';
// import { FlightStatus } from './custom-ui/Flightstatus';

// type CustomButtonsProps = {
//   onCustomMessage: (component: React.ReactNode) => void;
//   fetchFlightInfo?: () => Promise<any>;
// };

// const CustomButtons: React.FC<CustomButtonsProps> = ({ onCustomMessage, fetchFlightInfo }) => {
//   const handleFetchFlights = async () => {
//     if (!fetchFlightInfo) {
//       console.warn('fetchFlightInfo 함수가 정의되지 않았습니다.');
//       onCustomMessage(<div>항공편 정보를 가져올 수 없습니다.</div>);
//       return;
//     }

//     try {
//       const flightsData = await fetchFlightInfo();
//       onCustomMessage(
//         <ListFlights
//           flights={flightsData.list.map((flight: any) => ({
//             price: flight.price,
//             flight_time: flight.flight_time,
//             departure_time: flight.departure_time,
//             arrival_time: flight.arrival_time,
//           }))}
//           summary={{
//             arrivalCity: flightsData.destination,
//             departingCity: flightsData.departure,
//             arrivalAirport: flightsData.destination_code,
//             departingAirport: flightsData.departure_code,
//             date: flightsData.date,
//           }}
//         />
//       );
//     } catch (error) {
//       console.error('Failed to fetch flight data:', error);
//       onCustomMessage(<div>항공편 정보를 불러오지 못했습니다.</div>);
//     }
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-2 p-1">
//       <button
//         onClick={() =>
//           onCustomMessage(
//             <PurchaseTickets
//               summary={{
//                 airline: '대한항공',
//                 arrival: '도쿄',
//                 departure: '서울',
//                 departureTime: '09:00',
//                 arrivalTime: '11:30',
//                 price: 350000,
//                 seat: '12A',
//                 date: '2024-03-15',
//                 gate: '23',
//                 name: '김현우',
//                 class: '이코노미',
//               }}
//             />
//           )
//         }
//         className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
//       >
//         티켓 구매
//       </button>
//       <button
//         onClick={() =>
//           onCustomMessage(
//             <FlightStatus
//               summary={{
//                 airline: '대한항공',
//                 arrival: '도쿄',
//                 departure: '서울',
//                 departureTime: '09:00',
//                 arrivalTime: '11:30',
//                 price: 350000,
//                 seat: '12A',
//                 date: '2024-03-15',
//                 gate: '23',
//                 name: '김현우',
//                 class: '이코노미',
//               }}
//             />
//           )
//         }
//         className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
//       >
//         항공편 상태
//       </button>
//     </div>
//   );
// };

// export default CustomButtons;
