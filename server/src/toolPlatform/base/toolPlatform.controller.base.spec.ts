import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { ToolPlatformController } from "../toolPlatform.controller";
import { ToolPlatformService } from "../toolPlatform.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  clientId: "exampleClientId",
  contactEmail: "exampleContactEmail",
  createdAt: new Date(),
  deploymentId: "exampleDeploymentId",
  description: "exampleDescription",
  guid: "exampleGuid",
  id: "exampleId",
  name: "exampleName",
  productFamilyCode: "exampleProductFamilyCode",
  updatedAt: new Date(),
  url: "exampleUrl",
  version: "exampleVersion",
};
const CREATE_RESULT = {
  clientId: "exampleClientId",
  contactEmail: "exampleContactEmail",
  createdAt: new Date(),
  deploymentId: "exampleDeploymentId",
  description: "exampleDescription",
  guid: "exampleGuid",
  id: "exampleId",
  name: "exampleName",
  productFamilyCode: "exampleProductFamilyCode",
  updatedAt: new Date(),
  url: "exampleUrl",
  version: "exampleVersion",
};
const FIND_MANY_RESULT = [
  {
    clientId: "exampleClientId",
    contactEmail: "exampleContactEmail",
    createdAt: new Date(),
    deploymentId: "exampleDeploymentId",
    description: "exampleDescription",
    guid: "exampleGuid",
    id: "exampleId",
    name: "exampleName",
    productFamilyCode: "exampleProductFamilyCode",
    updatedAt: new Date(),
    url: "exampleUrl",
    version: "exampleVersion",
  },
];
const FIND_ONE_RESULT = {
  clientId: "exampleClientId",
  contactEmail: "exampleContactEmail",
  createdAt: new Date(),
  deploymentId: "exampleDeploymentId",
  description: "exampleDescription",
  guid: "exampleGuid",
  id: "exampleId",
  name: "exampleName",
  productFamilyCode: "exampleProductFamilyCode",
  updatedAt: new Date(),
  url: "exampleUrl",
  version: "exampleVersion",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("ToolPlatform", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ToolPlatformService,
          useValue: service,
        },
      ],
      controllers: [ToolPlatformController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /tool-platforms", async () => {
    await request(app.getHttpServer())
      .post("/tool-platforms")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /tool-platforms", async () => {
    await request(app.getHttpServer())
      .get("/tool-platforms")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /tool-platforms/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/tool-platforms"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /tool-platforms/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/tool-platforms"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
