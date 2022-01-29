import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import {
    faStar as faStarRegular,
    faStarHalf,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import _ from "lodash";
import styled from "styled-components";

export const count2Stars = (count) => {
    return Math.floor(count);
};

export const highlightColor = "#007185";

export const Stars = ({ rate, count }) => {
    const totalStars = count2Stars(rate);
    const half = rate - totalStars > 0.5;
    const remainingStars = 5 - totalStars - Number(half);

    return (
        <StarsStyle>
            <span className="star-icon">
                {_.times(totalStars, (i) => (
                    <FontAwesomeIcon
                        key={i}
                        className="star"
                        icon={faStarSolid}
                    />
                ))}
                {half ? (
                    <>
                        <FontAwesomeIcon
                            key={totalStars}
                            className="star"
                            icon={faStarHalf}
                        />
                    </>
                ) : (
                    ""
                )}
                {_.times(remainingStars, (i) => (
                    <FontAwesomeIcon
                        key={i + half + totalStars}
                        className="star remaining"
                        icon={faStarRegular}
                    />
                ))}
            </span>
            <span className="count">{count}</span>
        </StarsStyle>
    );
};

export const StarsStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .star-icon,
    .count {
        margin: 3px;
    }
`;
