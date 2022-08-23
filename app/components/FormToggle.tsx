import type { ChangeEvent, FC, ReactNode } from 'react';
import { Box, FormControl, FormLabel, Switch } from '@chakra-ui/react';

export interface Props {
    text?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onToggle?: (e: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    isChecked?: boolean;
}

const FormCheckbox: FC<Props> = (props) => {
    const { leftIcon, rightIcon, id, text, onToggle, isChecked } = props;

    return (
        <Box flexWrap={'wrap'} mb={5}>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor={id} mb="0">
                    {text}
                </FormLabel>
                {leftIcon}
                {typeof isChecked === 'boolean' && (
                    <Switch size={'lg'} isChecked={isChecked} onChange={onToggle} id={id} />
                )}
                {isChecked === undefined && <Switch size={'lg'} onChange={onToggle} id={id} />}
                {rightIcon}
            </FormControl>
        </Box>
    );
};

export default FormCheckbox;
