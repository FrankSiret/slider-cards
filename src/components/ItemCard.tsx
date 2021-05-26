import React from 'react'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Text } from 'grommet'
import { Favorite, FormCheckmark, ShareOption } from 'grommet-icons';
import styled from 'styled-components';

export interface IItemCardProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    from?: number;
    last24Hours?: boolean;
}

const StyledBox = styled(Box)`
    min-width: unset;
    max-width: unset;
`
const ItemCard: (props: IItemCardProps) => JSX.Element = (props) => {

    const { imageUrl, title, subtitle, from = 0, last24Hours = false } = props;

    return (
        <StyledBox width="250px" direction="column" >
            <Box round="small" overflow="hidden" flex >
                <Image fit="cover" src={imageUrl} alt={`[object] ${title}`} a11yTitle={title} />
            </Box>
            <Box flex="shrink">
                <Box margin={{ vertical: "1rem" }}>
                    <Text size="large" weight={500} >{title}</Text>
                    <Text title={subtitle} color="#ffffff88" truncate >{subtitle}</Text>
                </Box>
                <Box direction="row" justify="between" >
                    <Text>From <Text weight={500}>${from}</Text></Text>
                    {last24Hours && <Box direction="row"><FormCheckmark color="gold" /><Text weight={500}>24hr</Text></Box>
                    }
                </Box>
            </Box>
        </StyledBox>
    )
}

export default ItemCard;