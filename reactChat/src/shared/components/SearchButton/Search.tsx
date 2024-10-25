import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const SearchButton: React.FC<{
  className?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className = '', onClick }) => (
  <button className={className} onClick={onClick}>
    <SearchRoundedIcon />
  </button>
);
