export type ServerToClientEvents = {
    'code:update': (code: string) => void;
  };
  
  export type ClientToServerEvents = {
    'code:send': (code: string) => void;
  };
  
  export const ROLES = ['admin', 'player', 'interviewer'] as const;
  