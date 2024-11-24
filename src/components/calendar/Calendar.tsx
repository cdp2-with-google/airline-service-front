import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

export default function Calendar() {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const accessToken = 'YOUR_ACCESS_TOKEN'; // OAuth로 받아온 access token을 여기에 넣어주세요.

    const event = {
      summary: eventDetails.title,
      description: eventDetails.description,
      start: {
        dateTime: `${eventDetails.date}T${eventDetails.startTime}:00`,
        timeZone: 'Asia/Seoul',
      },
      end: {
        dateTime: `${eventDetails.date}T${eventDetails.endTime}:00`,
        timeZone: 'Asia/Seoul',
      },
    };

    try {
      const response = await axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('일정이 성공적으로 추가되었습니다!');
      console.log('Event created:', response.data);
    } catch (error) {
      alert('일정 추가 중 문제가 발생했습니다.');
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Google 캘린더 일정 추가</h1>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="title"
          placeholder="일정 제목"
          value={eventDetails.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          placeholder="날짜"
          value={eventDetails.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="startTime"
          placeholder="시작 시간"
          value={eventDetails.startTime}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="endTime"
          placeholder="종료 시간"
          value={eventDetails.endTime}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="설명"
          value={eventDetails.description}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>
        <button onClick={handleSubmit} className="bg-gray-800 text-white py-2 rounded hover:bg-gray-600">
          일정 추가하기
        </button>
      </div>
    </div>
  );
}
