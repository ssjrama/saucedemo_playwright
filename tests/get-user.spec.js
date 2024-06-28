const { test, expect } = require('@playwright/test');

test('Get a single user from api', async ({ request }) => {
    const user = await request.get(`https://reqres.in/api/users/2`);
    expect(user.ok()).toBeTruthy();
    const responseObject = await user.json();
    const expectedObject = {
        "data": {
            "avatar": "https://reqres.in/img/faces/2-image.jpg",
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "id": 2,
            "last_name": "Weaver"
        },
        "support": {
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!",
            "url": "https://reqres.in/#support-heading"
        }
    };

    expect(responseObject).toEqual(expect.objectContaining(expectedObject));
});