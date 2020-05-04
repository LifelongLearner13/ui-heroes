import React, { useCallback, useState, Fragment, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Divider, Collapse } from '@material-ui/core';
import MenuListItem from 'common/Header/MenuListItem';

function MenuList({ items, childProp = 'media' }) {
  const styles = useStyles();
  const [state, setState] = useState({});

  const handleChange = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setState((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    },
    [setState]
  );

  return (
    <List disablePadding>
      {items.map((item, idx, arr) => (
        <Fragment key={item.id}>
          <MenuListItem
            item={item}
            divider={true}
            childProp={childProp}
            isOpen={state[item.id]}
            handleChange={handleChange}
          />
          {item[childProp] && (
            <Collapse in={state[item.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item[childProp].map((sub) => (
                  <MenuListItem
                    key={sub.id}
                    item={sub}
                    classes={{ link: styles.nested }}
                  />
                ))}
              </List>
              {idx < arr.length - 1 ? <Divider /> : null}
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  nested: {
    padding: theme.spacing(1, 4),
  },
}));

MenuList.whyDidYouRender = true;

export default memo(MenuList);
