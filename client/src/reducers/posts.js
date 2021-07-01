export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE': 
            return [...posts, action.payload];
            break;
        case 'LIKE': 
        case 'UPDATE': 
            return posts.map((post)=>post._id===action.payload._id ? action.payload : post);
            break;
        case 'DELETE': 
            return posts.filter((post) => post._id !== action.payload);
            break;
        default:
            return posts;
            break;
    }
}