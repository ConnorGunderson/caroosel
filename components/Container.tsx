import styles from '@/styles/container.module.css';

export function Container({ gridSize, children }: any) {
  const n = gridSize;
  return (
    <div
      className={`
      ${styles.containerDefaults}
      ${n > 1 ? ' md:grid-cols-2 ' : ''} 
      ${n > 2 ? ' lg:grid-cols-3 ' : ''}
      ${n > 5 ? ' xl:grid-cols-5 ' : n > 3 ? ' xl:grid-cols-4 ' : ''}
    `}>
      {children}
    </div>
  );
}
