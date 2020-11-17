import React, { useContext } from 'react';
import Image from '../components/Image';
import {getClass} from '../utils';
import {Context} from '../Context';

function Photos() {
	const { allPhotos } = useContext(Context);
	const result = allPhotos.map((photo, index) => (
		<Image key={photo.id} img={photo} className={getClass(index)} />
	))

	return (
		<main className="photos">
			{result}
		</main>
	);
}

export default Photos;
