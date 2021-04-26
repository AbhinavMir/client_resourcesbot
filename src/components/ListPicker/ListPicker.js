import React from 'react';
import { TextField, Typography, withStyles, makeStyles, } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

// import default data for component
import cities from '../../raw/cities.js';

import './ListPicker.css';

const ListPicker = ({data, title, onPress}) => {
    const styles = {
        ListPickerWrapper: {
            margin: 10,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justtifyContent: 'center',
            alignItems: 'center',
            color: 'white',
        },
    };

    return (
        <div style={styles.ListPickerWrapper}>
            <Typography variant="h6" >
                {title}
            </Typography>
            <Autocomplete
                id="combo-box-demo"
                options={data}
                getOptionLabel={(option) => option}
                renderInput={(params) => 
                    <TextField
                        {...params}
                        style={{
                            color: 'white',
                            borderColor: 'white',
                        }}
                        variant="outlined"
                    />
                }
                onInputChange={(event, newInputValue) => {
                    onPress(newInputValue);
                }}
            />
        </div>
    );
};

ListPicker.defaultProps = {
    data: cities,
    title: 'List Picker Title',
    onPress: () => {},
}

export default ListPicker;
