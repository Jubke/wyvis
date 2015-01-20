json.array!(@usecases) do |usecase|
  json.extract! usecase, :id
  json.url usecase_url(usecase, format: :json)
end
