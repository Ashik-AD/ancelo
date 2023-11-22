import { useState, ReactNode, useCallback, useEffect, MouseEvent } from 'react';
import style from './style.module.scss';
import { Icon } from '@iconify/react';

type CardOptions = {
  label?: string;
  icon?: ReactNode;
  onClick: () => void;
};
export type CardTitleProps = {
  title: string;
  className?: string;
  icon?: ReactNode;
  options?: CardOptions[];
};

export default function CardTitle({ title, icon, options }: CardTitleProps) {
  return (
    <article className={`${style.card__title}`}>
      <div className={style.title_content}>
        {icon && <span className={style.title_icon}>{icon}</span>}
        <span className="h5 medium">{title}</span>
      </div>
      {options && <CardOption options={options} />}
    </article>
  );
}
function CardOption({ options }: { options: CardOptions[] }) {
  const iconIndex = options?.findIndex((option) => option?.icon);

  const renderCardOptions = options?.map((option, idx) => (
    <li className={style.dropdown__item} key={idx} onClick={option.onClick}>
      {iconIndex > -1 ? (
        <span className={style.item_icon}>{option.icon}</span>
      ) : null}
      <span className="text-small bold">{option.label}</span>
    </li>
  ));
  return <CardDropdown>{renderCardOptions}</CardDropdown>;
}

function CardDropdown({ children }: { children: ReactNode }) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const dropdownStyle = isShowDropdown
    ? { display: 'block' }
    : { display: 'none' };

  const handleDropdown = useCallback((eve: MouseEvent<HTMLElement>) => {
    setIsShowDropdown((prevState) => !prevState);
    eve.stopPropagation();
    //@ts-ignore
    document.addEventListener('click', handleDropdown);
  }, []);

  useEffect(() => {
    if (!isShowDropdown) {
      //@ts-ignore
      document.removeEventListener('click', handleDropdown);
    }
  }, [isShowDropdown]);

  return (
    <div className={style.card__option}>
      <button
        className={`${style.card_dropdown_btn}`}
        aria-label="Button for card menu"
        onClick={handleDropdown}
      >
        <Icon icon="solar:menu-dots-bold" role="button" tabIndex={0} />
      </button>
      <ul className={style.dropdown} style={dropdownStyle}>
        {children}
      </ul>
    </div>
  );
}
