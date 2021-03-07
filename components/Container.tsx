import styles from '../styles/container.module.css';

export default function Container(props: any) {
  return (
    <div
      className={`
        ${styles.containerDefaults} 
        ${
          props.gridSize > 2
            ? ' md:grid-cols-2 '
            : ` md:grid-cols-${props.gridSize} `
        } 
        ${
          props.gridSize > 4
            ? ' lg:grid-cols-4 '
            : ` lg:grid-cols-${props.gridSize} `
        } 
        ${
          props.gridSize > 5
            ? ' xl:grid-cols-5 '
            : ` xl:grid-cols-${props.gridSize} `
        } 
        `}
    >
      {props.children}
    </div>
  );
}
