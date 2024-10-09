import { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string; // className 속성 추가
  placeholder?: string; // placeholder 속성 추가
}

const Input: React.FC<InputProps> = ({ value, onChange, className, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 p-2 rounded ${className}`} // 추가된 className 사용
    />
  );
};

export default Input;
