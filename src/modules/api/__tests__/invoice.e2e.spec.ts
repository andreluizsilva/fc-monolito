import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const responseCreate = await request(app)
      .post("/invoice")
      .send({
        id: "1",
        name: "Invoice 1",
        document: "Invoice 1 document",
        street: "Invoice 1 Street",
        number: "10",
        complement: "Invoice 1 complement",
        city: "Invoice 1 city",
        state: "Invoice 1 state",
        zipCode: "Invoice 1 zipCode",
        items: [
            {
                id: "1",
                name: "Invoice 1 item 1",
                price: 10,
            },
            {
                id: "2",
                name: "Invoice 1 item 2",
                price: 20,
            }
        ],
        total: 30
      });

    const response = await request(app)
    .get("/invoice")
    .send({
        id: "1"
    });

    expect(responseCreate.status).toBe(200);
    expect(response.status).toBe(200);    
    expect(response.body.name).toBe("Invoice 1");
    expect(response.body.document).toBe("Invoice 1 document");
    expect(response.body.address.street).toBe("Invoice 1 Street");
    expect(response.body.address.complement).toBe("Invoice 1 complement");
    expect(response.body.address.number).toBe("10");
    expect(response.body.address.city).toBe("Invoice 1 city");
    expect(response.body.address.state).toBe("Invoice 1 state"); 
    expect(response.body.address.zipCode).toBe("Invoice 1 zipCode");
    expect(response.body.items[0].id).toBe("1");
    expect(response.body.items[0].name).toBe("Invoice 1 item 1");        
    expect(response.body.items[0].price).toBe(10);  
    expect(response.body.items[1].id).toBe("2");
    expect(response.body.items[1].name).toBe("Invoice 1 item 2");        
    expect(response.body.items[1].price).toBe(20);       
  });

  it("should not create a invoice", async () => {
    const response = await request(app).
    post("/invoice").send({
      name: "Invoice 1",
    });
    expect(response.status).toBe(500);
  });  
});