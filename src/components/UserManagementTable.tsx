import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Store";
import { fetchUsers, applyFilters } from "../features/userSlice";
import "./UserManagementTable.css";

interface FilterProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div className="filter-input">
    <label>{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const UserManagementTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filteredUsers, filters, status } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange =
    (field: keyof typeof filters) => (value: string) => {
      dispatch(applyFilters({ ...filters, [field]: value }));
    };

  return (
    <div className="container">
      <div className="glass-effect gradient-background fade-in">
        <h1>User Management Table</h1>
        <div className="table-container">
          <div style={{ marginBottom: "20px" }}>
            <FilterInput
              label="Name"
              placeholder="Search by name"
              value={filters.name}
              onChange={handleFilterChange("name")}
            />
            <FilterInput
              label="Username"
              placeholder="Search by username"
              value={filters.username}
              onChange={handleFilterChange("username")}
            />
            <FilterInput
              label="Email"
              placeholder="Search by email"
              value={filters.email}
              onChange={handleFilterChange("email")}
            />
            <FilterInput
              label="Phone"
              placeholder="Search by phone"
              value={filters.phone}
              onChange={handleFilterChange("phone")}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;
