import React, { useState } from 'react';
// import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
// import {apiRequestCategories, apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import ArrayCategoriesItem from './ArrayCategoriesItem';
// import {changingFlag} from '../../../redux/action';
// import {fetchposts, fetchpostsTwo, fetchpostsThree, fetchpostsFour, fetchpostsSix} from '../../../store/actions/postActions';
import styles from '../styles/components/AsideItem.module.css';
import { setProductData } from '../app/store/slices/product';
import { any } from 'prop-types';

// eslint-disable-next-line max-len
export default function AsideItem(props: { items: { items }, item: { id: any; children_id_list: any; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) {

  // const arrayCategories = useSelector((state) => state.post.arrayCategories[0]);

  const dispatch = useDispatch();

  const [state, setState] = useState(() => {
    return {
      status         : false,
      arrayCategories: []
    };
  });

  console.log(props.items);

  console.log(state);
  const ChangeOver = (item: any[]) => {
    const str = item.join('|');
    console.log(str);
    localStorage.clear();
    localStorage.setItem('array', JSON.stringify(str));
    dispatch(
      setProductData('aaaaa')
    );
    // dispatch(fetchpostsFour(str));
    // dispatch(fetchpostsSix(true));
    const baseUrl = 'https://bion.biz-mark.ru/api/v1/general';
    fetch(`${baseUrl}/categories?categories=${str}`)
      .then((response) => response.json())
      .then((data) => {
          setState(prev => {
            return {
              ...prev,
              arrayCategories: data.data.categories
            };
          });
        }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
    setState(prev => {
      return {
        ...prev,
        status: true
      };
    });
  };

  const clickCategories = () => {
    const id = props.item.id;
    console.log(id);
    // fetchpostsThree(id);
  };

  return (

    <div
      className={styles.asideItem__element}
      onClick={clickCategories}
      onMouseEnter={() => (ChangeOver(props.item.children_id_list))}
      onMouseLeave={() => (
        setState(prev => {
          return {
            ...prev,
            status: false
          };
        })
      )}
    >{props.item.name}

      <ul className={state.status ? styles.asideItem__elementList : styles.asideItem__elementList__none}>
        {state.arrayCategories.map(item =>
          <li>
            <ArrayCategoriesItem item={item}/>
          </li>
        )}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  let str: any;
  str = JSON.parse(localStorage.getItem('array'));
  console.log(str);
  const baseUrl = 'https://bion.biz-mark.ru/api/v1/general';
  const response = await fetch(`${baseUrl}/categories${str}`);
  const items = await response.json();
  // console.log('asdasdasdasd3333333', users);
  return {
    props: { items } // will be passed to the page component as props
  };
}