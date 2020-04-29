const BACKEND_SERVER = 'http://localhost:5000';

export class HomeworkService {
    
  fetchList = async() => {
    const homeworks = await (await fetch(`${BACKEND_SERVER}/api/homeworks`)).json();
    return homeworks;
  }

  updateOne = async(item) => {
    const req = await fetch(`${BACKEND_SERVER}/api/homeworks/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item)
      });
    return req;
  }

  deleteOne = async(removeId) => {
    await fetch(`${BACKEND_SERVER}/api/homeworks/${removeId}`, {
          method: 'DELETE'
        });
    return await this.fetchList();
  }
}