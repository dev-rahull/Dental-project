import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import PatientList from "../pages/PatientList";
import PatientDetail from "../pages/PatientDetail";
import AppointmentCalendar from "../pages/AppointmentCalendar";
import PatientView from "../pages/PatientView";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

export function AllRoutes(){
    return (
         <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute role="Admin" />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/patients/:id" element={<PatientDetail />} />
              <Route path="/calendar" element={<AppointmentCalendar />} />
            </Route>

            <Route element={<ProtectedRoute role="Patient" />}>
              <Route path="/my-records" element={<PatientView />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
    )
}