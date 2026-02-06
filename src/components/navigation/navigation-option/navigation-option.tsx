'use client'
import Link from 'next/link';
import css from './navigation-option.module.scss'
import { Option } from '@constants/navigation-options';

interface NavigationOptionProps{
   option: Option;
   isActive: boolean
}

export default function NavigationOption(props : NavigationOptionProps) {
  const {option, isActive} = props;
  const {href, icon} = option;
  return ( 
    <Link href={href} style={{transform: isActive ? 'scale(1)' : 'scale(0.9)'}} className={css.root}>
      <div className={css.iconContainer}>
        {icon}
      </div>
        
    </Link>
    
  );
}
