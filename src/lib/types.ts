export interface SleepAnalysis {
  id: string;
  date: string;
  userMessage: string;
  analysis: {
    mainIssues: string[];
    recommendations: string[];
    sleepScore: number;
    summary: string;
  };
}

export interface AnalyzeRequest {
  message: string;
}

export interface AnalyzeResponse {
  success: boolean;
  analysis?: SleepAnalysis;
  error?: string;
}
