export type TimeRange = {
  start: string;
  end: string;
};

export type DaySchedule = {
  open: boolean;
  ranges: TimeRange[];
};

export type Schedule = {
  [day: string]: DaySchedule;
};

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
  };
  schedule: Schedule;
};
