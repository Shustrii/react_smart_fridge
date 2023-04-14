import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import fridgeClose from '../img/fridge_close.png';
import fridgeOpen from '../img/fridge_open.png';

function DefaultPage() {
	const [fridge, setFridge] = useState(fridgeClose);

	return (
		<div>
			<Link className='img_start' to={'/fridge'}>
				<img alt=''
					src={fridge}
					style={{ width: '50%', height: '50%' }}
					onMouseEnter={() => setFridge(fridgeOpen)}
					onMouseOut={() => setFridge(fridgeClose)}
				/>
			</Link>
		</div>
	);
}
export default DefaultPage;