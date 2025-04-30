"use client";
import { FC } from "react";
import { useCounter } from "../../api/counter/v1/counter_rbt_react";
import { COUNTER_IDS } from "../../constants";

const TakeableCounter: FC<{ id: string; initialCount: number }> = ({
  id,
  initialCount,
}) => {
  const { useCount, increment, take } = useCounter({ id });
  const { response } = useCount();

  return (
    <div style={{ display: "flex" }}>
      <TakeableCounterView
        count={
          response ? response.count + increment.pending.length : initialCount
        }
        onIncrement={() => increment()}
        pending={increment.pending.length > 0}
        onTake={() =>
          take({
            takerId: id,
            takenIds: COUNTER_IDS.filter(
              (counterId: string) => counterId !== id
            ),
          })
        }
      />
      {/* <div>
        <div>Pending mutations array:</div>
        <div>{JSON.stringify(increment.pending)}</div>
      </div> */}
    </div>
  );
};

export default TakeableCounter;

export const TakeableCounterView: FC<{
  count: number;
  onIncrement: () => void;
  onTake: () => void;
  pending: boolean;
}> = ({ count, onIncrement, onTake, pending }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "8px",
        display: "inline-block",
        margin: "8px",
        background: pending ? "yellow" : "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        {count ? count : 0}
      </div>
      <div>
        <button
          style={{
            margin: "2px",
            background: "transparent",
            border: "1px solid black",
          }}
          onClick={onTake}
        >
          take
        </button>
        <button
          style={{
            margin: "2px",
            background: "transparent",
            border: "1px solid black",
          }}
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};
