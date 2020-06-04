import React from 'react';
import { css } from 'emotion';

const getStyles = () => ({
  wrapper: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  `,
  label: css`
    margin: 0px 0px 4px;
    padding: 0px 0px 0px 2px;
    max-width: 480px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.25;
    color: rgb(159, 167, 179);
  `,
  name: css`
    display: flex;
    align-items: center;
  `,
  description: css`
    display: block;
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
    color: rgb(123, 128, 135);
  `,
});

interface PropsType {
  label?: React.ReactNode;
  description?: string;
}

const MyField: React.FC<PropsType> = ({ label, description, children }) => {
  const styles = getStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <label>
          <div className={styles.name}>{label}</div>
          <span className={styles.description}>{description}</span>
        </label>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MyField;
