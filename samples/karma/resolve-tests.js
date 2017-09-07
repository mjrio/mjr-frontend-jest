var testsContext = require.context('./tests', true, /.spec$/);
testsContext.keys().forEach(testsContext);
