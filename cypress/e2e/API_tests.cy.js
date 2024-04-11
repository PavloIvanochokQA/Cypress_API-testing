describe("API_tests", () => {

    it("(GET) users by page", () => {
        const request = {
            method: "GET",
            url: "https://reqres.in/api/users",
            qs: {
                "page": "2"
            },
            headers: {
                "customHeader": "customValue",
                'Cookie': 'cookieName=cookieValue'
            },
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.equal("2", response.body.page)
            assert.equal("customValue", response.requestHeaders.customHeader);
            assert.equal("cookieName=cookieValue", response.requestHeaders['Cookie']);
            assert.isTrue(response.duration <= 300);
        });
    });



    it("(GET) single user by real id", () => {
        const request = {
            method: "GET",
            url: "https://reqres.in/api/users/1",
        };
        cy.request(request).then(response => {
            assert.equal('George', response.body.data.first_name);
            assert.equal(200, response.status);
            assert.isTrue(response.duration <= 300);
        });
    });



    it("(GET) single user by unreal id", () => {
        const request = {
            method: "GET",
            url: "https://reqres.in/api/users/1111",
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal(404, response.status);
            assert.isTrue(response.duration <= 300);
        });
    });



    it("(GET) single resource by real id", () => {
        const request = {
            method: "GET",
            url: "https://reqres.in/api/unknown/1",
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal("cerulean", response.body.data.name);
            assert.equal(200, response.status);
            assert.isTrue(response.duration <= 300);
        });
    });



    it("(GET) single resource by unreal id", () => {
        const request = {
            method: "GET",
            url: "https://reqres.in/api/unknown/aaa",
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal(404, response.status);
            assert.isTrue(response.duration <= 500);
        });
    });



    it("(POST) create new user", () => {
        const body = {
            "name": "Pavlo",
            "job": "QA"
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/users",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal(201, response.status);
            assert.isTrue(response.duration <= 300);
            assert.notStrictEqual(body, response.body.data);
        });
    });



    it("(POST) create new user with invalid data", () => {
        const body = {
            "job": 111
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/users",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(400, response.status);
        });
    });



    it("(PUT) update user", () => {
        const body = {
            "name": "Nik",
            "job": "seller"
        };
        const request = {
            method: "PUT",
            url: "https://reqres.in/api/users/12",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.isTrue(response.duration <= 300);
            assert.notStrictEqual(body, response.body.data);
        });
    });



    it("(PUT) update user with no data", () => {
        const body = {
        };
        const request = {
            method: "PUT",
            url: "https://reqres.in/api/users/1",
            body,
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(400, response.status);
        });
    });



    it("(PATCH) update user", () => {
        const body = {
            "name": "Nik",
            "job": "seller"
        };
        const request = {
            method: "PATCH",
            url: "https://reqres.in/api/users/12",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.isTrue(response.duration <= 300);
            assert.notStrictEqual(body, response.body.data);
        });
    });



    it("(PATCH) update user with no data", () => {
        const body = {
        };
        const request = {
            method: "PATCH",
            url: "https://reqres.in/api/users/1",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(400, response.status);
        });
    });



    it("(DELETE) user", () => {
        const request = {
            method: "DELETE",
            url: "https://reqres.in/api/users/10",
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(204, response.status);
        });
    });



    it("(DELETE) unreal user", () => {
        const request = {
            method: "DELETE",
            url: "https://reqres.in/api/users/aaaaaaaa",
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(400, response.status);
        });
    });



    it("(POST) successful register", () => {
        const body = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/register",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(200, response.status);
        });
    });



    it("(POST) unsuccessful register", () => {
        const body = {
            "email": "pavlo2307@gmail.com",
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/register",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(400, response.status);
            assert.equal('Missing password', response.body.error);
        });
    });



    it("(POST) unsuccessful register(no email)", () => {
        const body = {
            "password": "pavlo23072024",
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/register",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(400, response.status);
            assert.equal('Missing email or username', response.body.error);
        });
    });



    it("(POST) successful login", () => {
        const body = {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/login",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal(200, response.status);
        });
    });



    it("(POST) unsuccessful login", () => {
        const body = {
            "email": "eve.holt@reqres.in",
        };
        const request = {
            method: "POST",
            url: "https://reqres.in/api/login",
            body,
            failOnStatusCode: false
        };
        cy.request(request).then(response => {
            assert.isTrue(response.duration <= 300);
            assert.equal("Missing password", response.body.error)
            assert.equal(400, response.status);
        });
    });
});