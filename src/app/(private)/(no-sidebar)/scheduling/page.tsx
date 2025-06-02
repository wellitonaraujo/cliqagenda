import AppointmentForm from "./ui/AppointmentForm";

export default function CreateAppointmentPage() {
  return (
     <div className="flex justify-center items-start min-h-screen bg-white py-10">
      <div className="w-full max-w-2xl px-6 py-8 bg-white rounded-xl shadow-md border border-gray-200">
        <AppointmentForm />
      </div>
    </div>
  );
}
