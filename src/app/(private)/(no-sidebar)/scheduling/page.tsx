import AppointmentForm from "./ui/AppointmentForm";

export default function CreateAppointmentPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xl bg-white p-6 rounded border border-gray-100 shadow-xs">
        <AppointmentForm />
      </div>
    </div>
  );
}
