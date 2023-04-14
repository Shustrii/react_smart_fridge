import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const SelectSearch = ({options, value, changeData, lable, invalidMsg, defaultValue, optionData}) => {
	return (
		<Form.Group>
			<Form.Label>{lable}</Form.Label>
			<Select aria-label='Default select example' 
				//value={product.measure_name} 
				options={options}
				value={value}
				getOptionValue={(option) => `${option[optionData.id]}`}
				getOptionLabel={(option) => `${option[optionData.name]}`}
				onChange={(e)=>{changeData(e);}}
			/>
			<Form.Control required type='text' defaultValue={defaultValue} hidden/>
			<Form.Control.Feedback type='invalid'>
				{invalidMsg}
			</Form.Control.Feedback>
		</Form.Group>
	);
};

export default SelectSearch;