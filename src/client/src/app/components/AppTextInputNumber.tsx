import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    inputProps: { 
        max: number, min: number 
    }
}

export default function AppTextInputNumber(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <TextField 
            {...props}
            {...field}
            multiline={props.multiline}
            rows={props.rows}
            type={props.type}
            InputProps={{
                inputProps: { 
                    max: props.inputProps.max, min: props.inputProps.min 
                }
            }}
            fullWidth
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    )
}