export interface Report {
  id: string;
  title: string;
  subtitle: string;
  metrics: {
    openAlerts: number;
    closingRate: number;
    oldestAlertDays: number;
    unitData: number[];
    distribution: number[];
  };
}
