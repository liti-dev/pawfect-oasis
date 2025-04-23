import { add } from 'date-fns'

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays })
  if (!withTime) date.setUTCHours(0, 0, 0, 0)
  return date.toISOString().slice(0, -1)
}

export const bookings = [
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    suiteId: 1,
    guestId: 2,
    hasMeal: true,
    notes: 'Shin is allergic to mushroom',
    isPaid: false,
    numPets: 1,
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    suiteId: 1,
    guestId: 3,
    hasMeal: true,
    notes: '',
    isPaid: true,
    numPets: 2,
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    suiteId: 1,
    guestId: 4,
    hasMeal: false,
    notes: '',
    isPaid: false,
    numPets: 2,
  },

  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    suiteId: 2,
    guestId: 5,
    hasMeal: false,
    notes: '',
    isPaid: true,
    numPets: 2,
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    suiteId: 2,
    guestId: 6,
    hasMeal: true,
    notes: '',
    isPaid: true,
    numPets: 2,
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    suiteId: 2,
    guestId: 7,
    hasMeal: true,
    notes: '',
    isPaid: false,
    numPets: 2,
  },

  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    suiteId: 3,
    guestId: 8,
    hasMeal: true,
    notes: '',
    isPaid: true,
    numPets: 1,
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    suiteId: 3,
    guestId: 9,
    hasMeal: false,
    notes: 'We will be bringing our small dog with us',
    isPaid: true,
    numPets: 3,
  },
]
