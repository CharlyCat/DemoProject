export interface DayAvailability {
    Date: string;
    HoursAvailable: number[];
    Status?: ('AVAILABLE' | 'UNAVAILABLE' | 'FULL' | 'SELECTED')[];
  }

  const mockData: DayAvailability[] = [
    {
      "Date": "2016-05-18",
      "HoursAvailable": [9, 10, 11, 12, 13, 14, 17]
    },
    {
      "Date": "2016-05-19",
      "HoursAvailable": [9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
      "Date": "2016-05-20",
      "HoursAvailable": [9, 10, 14, 15, 16, 17]
    },
    {
      "Date": "2016-05-21",
      "HoursAvailable": [9, 10, 11, 12, 13]
    },
    {
      "Date": "2016-05-23",
      "HoursAvailable": [13, 14, 15, 16]
    },
    {
      "Date": "2016-05-24",
      "HoursAvailable": [11, 12, 15, 16, 17]
    }
  ];

/**
 * Return all data (currently mock data but usually retrieve from API DB)
 */
export const getData = (): DayAvailability[] => {
    return mockData;
  }
