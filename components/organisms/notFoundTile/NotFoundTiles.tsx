import styles from './NotFoundTiles.module.css';
import { FIXED_COLS, FIXED_ROWS, PADDING, TILE_HEIGHT, TILE_WIDTH } from './notFound.constants.ts';
import { createActiveTiles, getHoverColor } from './notFound.utils.ts';

interface TileProps {
  x: number;
  y: number;
  isActive: boolean;
}

function Tile({ x, y, isActive }: TileProps) {
  const hoverColor = getHoverColor(x, y);

  return (
    <rect
      x={x * TILE_WIDTH + PADDING / 2}
      y={y * TILE_HEIGHT + PADDING / 2}
      width={TILE_WIDTH - PADDING}
      height={TILE_HEIGHT - PADDING}
      rx={(TILE_WIDTH - PADDING) * 0.2}
      style={{ ['--hover-color' as string]: hoverColor }}
      className={`${styles.tile} ${isActive ? styles.active : styles.inactive}`}
    />
  );
}

export default function NotFoundTiles() {
  const activeTiles = createActiveTiles();
  const svgWidth = FIXED_COLS * TILE_WIDTH;
  const svgHeight = FIXED_ROWS * TILE_HEIGHT;

  return (
    <div className={styles.scrollOuter}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className={styles.svg}
      >
        {Array.from({ length: FIXED_ROWS }).map((_, y) =>
          Array.from({ length: FIXED_COLS }).map((__, x) => (
            <Tile key={`${x}-${y}`} x={x} y={y} isActive={activeTiles.has(`${x}-${y}`)} />
          )),
        )}
      </svg>
    </div>
  );
}
