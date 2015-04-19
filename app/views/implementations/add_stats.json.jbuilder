if success
  json.execution_time implementation.execution_time

else 
  json.success false
  json.errors errors
end