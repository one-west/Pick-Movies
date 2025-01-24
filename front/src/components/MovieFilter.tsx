import React, {useState} from "react";
import {DatePicker} from "antd"; // Ant Design의 DatePicker 가져오기
import type {RangePickerProps} from "antd/es/date-picker"; // RangePicker의 타입
import {Dayjs} from "dayjs";
import {FilterProps} from "../type/FilterProps.ts"; // dayjs 라이브러리 가져오기

interface MovieFilterProps {
  onFilterChange: (filter: FilterProps) => void;
}

export default function MovieFilter({onFilterChange}: MovieFilterProps) {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const genreMapping: { [key: string]: string } = {
    "Action": "28",
    "Comedy": "35",
    "Drama": "18",
    "Horror": "27",
    "Romance": "10749",
    // 추가적인 장르 매핑
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = genreMapping[e.target.value];
    onFilterChange({genre});
  };

  const handleDateChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    setDates(dates); // 선택된 Dayjs 객체 배열 저장
    if (dates) {
      // 날짜가 모두 선택되었을 경우, 시작 날짜와 끝 날짜를 yyyy-MM-DD 형식으로 전달
      onFilterChange({
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      });
    } else {
      // 날짜 범위가 선택되지 않으면 필터를 초기화
      onFilterChange({
        startDate: undefined,
        endDate: undefined,
      });
    }
  };

  return (
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Filter Movies</h2>

        {/* 장르 필터 */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Genre</label>
          <select
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
          </select>
        </div>

        {/* 날짜 범위 필터 */}
        <div className="mb-4">
          <label className="block text-white mb-2">Select Date Range</label>
          <DatePicker.RangePicker
              value={dates}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              className="w-full bg-white text-gray-700"
              style={{
                padding: "10px 14px", // 내부 여백
              }}
          />
        </div>
      </div>
  );
}
