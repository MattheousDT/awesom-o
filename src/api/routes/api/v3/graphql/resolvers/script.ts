import { scriptService } from "../../../../../../lib/db";

export default {
  Query: {
    scripts: async (_: any, variables: any, context: any) => {
      // TODO: remove this!!! (temp shitty filters)
      const author_id = context.reply.request.body.variables?.author_id ?? variables?.author_id;
      const name = context.reply.request.body.variables?.name ?? variables?.name;
      const featured = context.reply.request.body.variables?.featured ?? variables?.featured;
      const marketplace_enabled = context.reply.request.body.variables?.marketplace_enabled ?? variables?.marketplace_enabled;
      const verified = context.reply.request.body.variables?.verified ?? variables?.verified;
      const page = context.reply.request.body.variables?.page ?? variables?.page;
      const limit = context.reply.request.body.variables?.limit ?? variables?.limit;
      const sortField = context.reply.request.body.variables?.sortField ?? variables?.sortField;
      const sortDirection = context.reply.request.body.variables?.sortDirection ?? variables?.sortDirection; 

      const filters = {
        author_id,
        name,
        featured,
        marketplace_enabled,
        verified,
      };

      const res = await scriptService.getMany(filters, sortField, sortDirection, limit, page);

      return res;
    },
    script: async (_: any, variables: any, context: any) => {
      const scriptId = context.reply.request.body.variables.scriptId ?? variables.scriptId;
      const script = await scriptService.getOneById(scriptId);

      return script;
    }
  },
  Mutation: {
    addScript: async (_: any, variables: any, context: any) => {
      const scriptData = context.reply.request.body.variables.scriptData ?? variables.scriptData;
      const script = await scriptService.saveOne(scriptData);

      return script;
    },
    updateScript: async (_: any, variables: any, context: any) => {
      const scriptId = context.reply.request.body.variables.scriptId ?? variables.scriptId;
      const scriptData = context.reply.request.body.variables.scriptData ?? variables.scriptData;
      const info = await scriptService.updateOne(scriptId, scriptData);

      return info;
    },
    deleteScript: async (_: any, variables: any, context: any) => {
      const scriptId = context.reply.request.body.variables.scriptId ?? variables.scriptId;
      const info = await scriptService.deleteOne(scriptId);

      return info;
    }
  }
};
