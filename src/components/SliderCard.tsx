/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useCallback, useEffect, useRef, useState, version } from 'react'
import { Box, BoxProps, Button, Heading, Text } from 'grommet'
import { Next, Previous } from 'grommet-icons';
import { useResizeDetector } from 'react-resize-detector';
import styled from 'styled-components';

export interface ISliderCardProps extends BoxProps {
    stepWidth?: number;
    title?: string | ReactNode;
    previous?: string | ReactNode;
    next?: string | ReactNode;
    children: React.ReactNode;
}

const HeadingBox = styled(Box)`
    margin: auto 0;
    margin-right: auto;
`

const ControlsBox = styled(Box)`
    margin: auto 0.5rem;
`

const StyledButton = styled(Button)`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ffffff22;
    background: #ffffff11;
    &:hover {
        background: #ffffff33;
    }
    &:disabled {
        background: #ffffff11;
    }
    > * {
        margin: 0.3rem;
    }
`

const SliderCard: (props: ISliderCardProps) => JSX.Element = (props) => {

    const { stepWidth, title, previous = <Previous />, next = <Next />, children, ...rest } = props;

    const [isScrollLeft, setIsScrollLeft] = useState(false)
    const [isScrollRight, setIsScrollRight] = useState(false)

    const interval = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (interval.current && (!isScrollLeft || !isScrollRight))
            clearInterval(interval.current)
    }, [isScrollLeft, isScrollRight])

    const onResize = useCallback(() => {
        onScroll && onScroll()
    }, [])

    const { ref } = useResizeDetector({ onResize });

    const onScroll = useCallback(() => {
        const elem = ref.current;
        if (elem) {
            const clientWidth = elem.clientWidth;
            const scrollWidth = elem.scrollWidth;
            const scrollLeft = elem.scrollLeft;
            const left = scrollWidth - scrollLeft;

            setIsScrollLeft(scrollLeft > 1);
            setIsScrollRight(left - clientWidth > 1);
        }
    }, [ref])

    const scrollTo = (sw: number) => {
        const elem: HTMLDivElement = ref.current;
        elem && elem.scrollTo({
            top: 0,
            left: elem.scrollLeft + sw,
            behavior: 'smooth'
        });
    }

    const previousClick = () => {
        stepWidth && scrollTo(-stepWidth)
    }

    const nextClick = () => {
        stepWidth && scrollTo(+stepWidth)
    }

    const stopRepeat = () => {
        interval.current && clearInterval(interval.current);
    }

    const previousRepeat = () => {
        stopRepeat()
        previousClick()
        interval.current = setInterval(previousClick, 200);
    }

    const nextRepeat = () => {
        stopRepeat()
        nextClick()
        interval.current = setInterval(nextClick, 200);
    }

    return (
        <Box
            pad="medium"
            direction="column"
            {...rest}
        >
            <Box
                direction="row"
            >
                <HeadingBox>
                    {typeof title === 'string'
                        ? (
                            <Heading level={2} margin={{ vertical: "0" }}>
                                {title}
                            </Heading>
                        )
                        : title
                    }
                </HeadingBox>
                <ControlsBox>
                    <StyledButton disabled={!isScrollLeft} onMouseDown={() => previousRepeat()} onMouseUp={() => stopRepeat()} >
                        {previous}
                    </StyledButton>
                </ControlsBox>
                <ControlsBox>
                    <StyledButton disabled={!isScrollRight} onMouseDown={() => nextRepeat()} onMouseUp={() => stopRepeat()} >
                        {next}
                    </StyledButton>
                </ControlsBox>
            </Box>
            <Box
                ref={ref}
                onScroll={() => onScroll()}
                direction="row"
                width="100%"
                flex
                gap="1rem"
                margin={{ top: "small" }}
                overflow={{ "vertical": "hidden", "horizontal": "hidden" }}
            >
                {children}
            </Box>
        </Box >
    )
}

export default SliderCard;