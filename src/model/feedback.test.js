/* eslint-env jest */
import createModel from './feedback'

describe('feedback querying', () => {
  describe('singular query', () => {
    it('filters using the given id', async () => {
      const context = {
        Feedbacks: {
          async findOne ({ _id }) {
            return _id === 'id'
          }
        }
      }

      const model = createModel(context)
      const result = await model.feedback('id')

      expect(result).toEqual(true)
    })
  })

  describe('plural query', () => {
    it('returns all items', async () => {
      const context = {
        Feedbacks: {
          find: () => ({
            limit: () => ({
              toArray: async () => [
                { _id: 'Example 1' },
                { _id: 'Example 2' }
              ]
            })
          })
        }
      }

      const args = {
        cursor: {
          quantity: 10
        }
      }

      const model = createModel(context)
      const result = await model.feedbacks(args)

      expect(result.items).toEqual([{ _id: 'Example 1' }, { _id: 'Example 2' }])
    })
  })
})

describe('feedback operations', () => {
  describe('feedback creation', () => {
    it('successfully creates a well formed feedback', async () => {
      const spy = {
        called: false,
        result: null
      }

      const args = {
        contents: 'Example',
        facility: 'facility_id'
      }

      const context = {
        Feedbacks: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)

      await model.addFeedback(args)

      expect(spy.called).toEqual(true)
      expect(spy.result.resolved).toEqual(false)
      expect(spy.result.contents).toEqual('Example')
      expect(spy.result.facility).toEqual('facility_id')
    })

    it('fails if a required field is missing', async () => {
      const spy = {
        called: false,
        result: null
      }

      const args = {
        facility: 'facility_id'
      }

      const context = {
        Feedbacks: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)
      const operation = model.addFeedback(args)
      const expectedError = new Error('Received empty value for required field: contents')

      expect(operation).rejects.toEqual(expectedError)
    })
  })

  describe('feedback resolving', () => {
    it('successfully marks as resolved an unresolved feedback', async () => {
      const spy = {
        called: false,
        filters: null,
        updates: null
      }

      const args = {
        _id: 'example'
      }

      const context = {
        Feedbacks: {
          findOneAndUpdate: async (filters, updates) => {
            spy.called = true
            spy.filters = filters
            spy.updates = updates

            return { value: { _id: 'example' } }
          }
        }
      }

      const model = createModel(context)

      await model.resolveFeedback(args)

      expect(spy.called).toEqual(true)
      expect(spy.filters._id).toEqual('example')
      expect(spy.updates.$set).toEqual({ resolved: true })
    })
  })
})
