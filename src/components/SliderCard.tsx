import { Box, BoxProps, Heading, Text } from 'grommet'
import { Next, Previous } from 'grommet-icons';
import React, { ReactNode, version } from 'react'
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

const SliderCard: (props: ISliderCardProps) => JSX.Element = (props) => {

    const { stepWidth, title, previous = <Previous />, next = <Next />, children, ...rest } = props;

    return (
        <Box
            {...rest}
        >
            <Box direction="row">
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
                    {previous}
                </ControlsBox>
                <ControlsBox>
                    {next}
                </ControlsBox>
            </Box>
            <Box
                direction="row"
                width="100%"
                gap="1rem"
                margin={{ top: "small" }}
                overflow={{ "vertical": "hidden", "horizontal": "scroll" }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default SliderCard;