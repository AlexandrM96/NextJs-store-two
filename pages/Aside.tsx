// import {useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import AsideItem from './AsideItem';
import { useSelector } from 'react-redux';
import { selectProfile } from '../app/store/slices/profile';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import styles from '../styles/components/Aside.module.css';

const Aside = () => {
  const profile = useSelector(selectProfile) as any;
  return (
    <>
      <aside className={styles.aside}>
        <div className={styles.aside__container}>
          <ul className={styles.aside__container__ulList}>
            {profile.name.map((item: { id: any; children_id_list?: any; name?: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) =>
              <li
                className={styles.ulList__element}
                key={item.id}
              >
                <AsideItem item={item}/>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Aside;

