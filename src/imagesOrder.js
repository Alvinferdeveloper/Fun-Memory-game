
const generateListOfImages = ({amount,images})=>{
    const array=[];
    const copyOfimages = [...images];
    let counter = 8;
    for(let i=1;i<=amount;i++){
        let position = Math.floor(Math.random()*counter--);
    array.push(
        {
            id: i,
            imageUrl:copyOfimages[position]
        }
    );
    copyOfimages.splice(position,1);
    }
    return [...array,...array];
}

export const getImagesToRender =({...parameters})=>{
    return generateListOfImages(parameters).sort(()=>Math.random()-0.5);
}