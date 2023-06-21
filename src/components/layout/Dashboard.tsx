import React, { useEffect, useState } from "react";
import Header from "./header";
import useAppDispatch from "../../hooks/useAppDispatch";
import { fetchAllUsers } from "../../redux/reducers/usersReducer";
import { User } from "../../types/User";
import useAppSelector from "../../hooks/useAppSelector";

const getFilteredList = (users: User[], search: string) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { users, loading, error } = useAppSelector(state => state.usersReducer)
  const filterUsers = getFilteredList(users, search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("FetchAllUsers useEffect")
    dispatch(fetchAllUsers({ page: 1, per_page: 20 }));
  }, []);

  return (
    <>
      <Header />
      <div>
        <h2>DashBoard</h2>
        {filterUsers.map((user) => (
          <li key={user.id}>
            <p>
              {user.name}: {user.email}
            </p>
          </li>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
