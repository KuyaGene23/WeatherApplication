import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Dubai",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Los Angeles",
    },
    {
      id: 5,
      title: "New York",
    },
    {
      id: 6,
      title: "Seattle",
    },
  ];

  return (
    <div className="flex text-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className=" text-lg font-medium btn btn-outline-primary p-2 m-2"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
