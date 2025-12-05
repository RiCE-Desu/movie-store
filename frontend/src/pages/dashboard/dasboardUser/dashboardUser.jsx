import DataTable from "@/components/dataTable";
import { columns } from "@/pages/dashboard/dasboardUser/columsUser";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { getUsers} from "@/utils/api/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardUser() {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/dashboard/user/add');
  }

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LayoutDashboard>
      <Button onClick={handleAddUser} className="mb-4">Add User</Button>
      <DataTable columns={columns} data={users} />
    </LayoutDashboard>
  );
}
