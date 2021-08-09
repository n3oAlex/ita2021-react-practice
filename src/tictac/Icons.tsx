import { POSITION, Player } from "./Types";

const iconsFill = "#19609C";

export const ResetIcon = () => (
  <svg fill={iconsFill} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
    ></path>
  </svg>
);

export const PlusIcon = () => (
  <svg fill={iconsFill} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
    />
  </svg>
);

export const MinusIcon = () => (
  <svg fill={iconsFill} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    />
  </svg>
);

export const CrossIcon = ({ winner }: { winner?: Player | null }) => (
  <svg
    fill={winner === POSITION.Player_1 ? "green" : iconsFill}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    ></path>
  </svg>
);

export const CircleIcon = ({ winner }: { winner?: Player | null }) => (
  <svg
    viewBox="0 0 20 20"
    fill={winner === POSITION.Player_2 ? "green" : iconsFill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9497 14.9497C16.2625 13.637 17 11.8565 17 10C17 8.14348 16.2625 6.36301 14.9497 5.05025C13.637 3.7375 11.8565 3 10 3C8.14348 3 6.36301 3.7375 5.05025 5.05025C3.7375 6.36301 3 8.14348 3 10C3 11.8565 3.7375 13.637 5.05025 14.9497C6.36301 16.2625 8.14348 17 10 17C11.8565 17 13.637 16.2625 14.9497 14.9497ZM13.7123 13.7123C14.6969 12.7277 15.25 11.3924 15.25 10C15.25 8.60761 14.6969 7.27226 13.7123 6.28769C12.7277 5.30312 11.3924 4.75 10 4.75C8.60761 4.75 7.27226 5.30312 6.28769 6.28769C5.30312 7.27226 4.75 8.60761 4.75 10C4.75 11.3924 5.30312 12.7277 6.28769 13.7123C7.27226 14.6969 8.60761 15.25 10 15.25C11.3924 15.25 12.7277 14.6969 13.7123 13.7123Z"
    />
  </svg>
);
